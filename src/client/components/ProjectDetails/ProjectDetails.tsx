import type { ChangeEvent, FunctionComponent } from 'react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logger from '../../../server/logger';
import type { EmployeesForProject, WorkLogsWithEmployee } from '../../../common/utilities/types';
import { isEmployeesForProjectArray, isObjectRecord, isProjectArray, isProjectWeekArray, isUsersArray, isWorkLogWithEmployeeArray } from '../../../common/utilities/types';
import Button, { ButtonSize, ButtonVariant } from '../Button/Button';
import ChevronLeftIcon from '../../static/svgs/ChevronLeftIcon';
import ChevronRightIcon from '../../static/svgs/ChevronRightIcon';
import EditIcon from '../../static/svgs/EditIcon';
import AdminAssignEmployee from '../AdminAssignEmployee/AdminAssignEmployee';
import { getAllProjects, getListOfUsers } from '../../redux/selectors/adminPortal';
import { AdminPortalActions } from '../../redux/slices/adminPortal';
import type { ProjectWeek } from '../../../server/database';
import ProjectBillings from '../ProjectBillings/ProjectBillings';
import styles from './ProjectDetails.scss';

const getDaysInWeek = (currentDate: Date): Date[] => {
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const first = currentDate.getDate() - currentDate.getDay() + i;
    const day
    = new Date(currentDate.setDate(first));
    days.push(day);
  }
  return days;
};

const ProjectDetails: FunctionComponent
 = () => {
   const [billingsOrDetails, setBillingsOrDetails] = useState(true);
   const [showAssignEmployeeForm, setShowAssignEmployeeForm] = useState(false);
   const [showInvoiceForm, setShowInvoiceForm] = useState(false);

   const [currentDate, setCurrentDate] = useState(new Date());

   const todaysDate = new Date();
   const daysInWeek = useMemo(() => getDaysInWeek(currentDate), [currentDate]);
   const [projectWeek, setProjectWeek] = useState<ProjectWeek>();
   const [logsForWeekWithEmployee, setLogsForWeekWithEmployee]
    = useState<WorkLogsWithEmployee[]>([]);
   const [employeesForProject, setEmployeesForProject]
    = useState<EmployeesForProject[]>([]);

   //  console.log('logsForWeekWithEmployee: ', logsForWeekWithEmployee);
   console.log('employeesForProject: ', employeesForProject);

   const { projectId } = useParams();

   const dispatch = useDispatch();

   const allProjects = useSelector(getAllProjects);
   const thisProjectArray
   = allProjects.filter(project => project.id === Number(projectId));
   const thisProject = thisProjectArray[0] ?? [];

   // TODO: stuck here with setter not getting updated with eventual true value
   const billingStatusBoolean = projectWeek?.billingStatus ?? false;

   const [billingStatusForDropdown, setBillingStatusForDropdown]
   = useState(billingStatusBoolean);

   console.log('projectWeek boolean value: ', projectWeek?.billingStatus);
   console.log('billingStatusForDropdown: ', billingStatusForDropdown);

   let isCurrentWeek = true;

   isCurrentWeek = daysInWeek.some(day => (
     day.getDate() === todaysDate.getDate()
     && day.getMonth() === todaysDate.getMonth()
        && day.getFullYear() === todaysDate.getFullYear()
   ));

   const monthConfig: Intl.DateTimeFormatOptions = { month: 'short' };
   const dayConfig: Intl.DateTimeFormatOptions = { day: 'numeric' };

   //  Worklogs have userId, projectId, start and end times, and hourly rate
   //  users has name, email, phone, and hourly rate
   //  client_projects has clientId, title, description, start date, status

   // Billings:
   //  For each day, get work logs with start/end times,
   // rate, total those two up, AND get username

   // SELECT all users WHERE project_id on junction table JOIN work_logs
   // WHERE user_id matches and unix times between week times

   // translate money to dollar
   //  const USDollar = new Intl.NumberFormat('en-US', {
   //   style: 'currency',
   //   currency: 'USD',
   // });

   // const dollarDisplay = USDollar.format(totalBilling);

   const getUnixDayStart = (date: Date): number => {
     date.setHours(0);
     date.setMinutes(0);
     date.setSeconds(0);
     date.setMilliseconds(0);

     return Math.floor(date.getTime() / 1000);
   };

   const getUnixDayEnd = (date: Date): number => {
     date.setHours(23);
     date.setMinutes(59);
     date.setSeconds(59);
     date.setMilliseconds(999);

     return Math.floor(date.getTime() / 1000);
   };

   // Populate redux store
   const getProjectList = useCallback(async() => {
     try {
       const response = await fetch('api/projects/', {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json',
         },
         credentials: 'same-origin',
       });

       const result: unknown = await response.json();

       if (!isObjectRecord(result)) {
         throw new Error('Unexpected body type: ManageProjects.tsx');
       }

       const { fullProjectList } = result;

       if (isProjectArray(fullProjectList)) {
         dispatch(AdminPortalActions.populateProjectsArray({
           fullProjectList,
         }));
       }
     } catch (err: unknown) {
       if (err instanceof Error) {
         logger.error(err.message);
       }
     }
   }, [dispatch]);

   const getUserList = useCallback(async() => {
     try {
       const response = await fetch('/api/users', {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json',
         },
         credentials: 'same-origin',
       });

       const result: unknown = await response.json();

       if (!isObjectRecord(result)) {
         throw new Error('Unexpected body type: ManageUsers.tsx');
       }
       const { usersArray } = result;
       if (isUsersArray(usersArray)) {
         dispatch(AdminPortalActions.populateUserList({ usersArray }));
       }
     } catch (err: unknown) {
       if (err instanceof Error) {
         logger.error(err.message);
       }
     }
   }, [dispatch]);

   // Fetch individual week
   const fetchProjectWeek = useCallback(async() => {
     try {
       const numberId = Number(projectId);
       const unixWeekStart = getUnixDayStart(daysInWeek[0]);
       const unixWeekEnd = getUnixDayEnd(daysInWeek[6]);

       const response = await fetch('/api/projectWeek', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ numberId, unixWeekStart, unixWeekEnd }),
         credentials: 'same-origin',
       });

       const result: unknown = await response.json();

       if (!isObjectRecord(result)) {
         throw new Error('Unexpected body type: ProjectDetails.tsx');
       }
       const { listResult } = result;

       if (isProjectWeekArray(listResult)) {
         setProjectWeek(listResult[0]);
       }
     } catch (err: unknown) {
       if (err instanceof Error) {
         logger.error(err.message);
       }
     }
   }, [projectId, daysInWeek]);

   const getWorkLogsWithEmployee = useCallback(async() => {
     try {
       const numberId = Number(projectId);
       const unixWeekStart = getUnixDayStart(daysInWeek[0]);
       const unixWeekEnd = getUnixDayEnd(daysInWeek[6]);
       const response = await fetch('/api/workLogs/withEmployee', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ numberId, unixWeekStart, unixWeekEnd }),
         credentials: 'same-origin',
       });

       const result: unknown = await response.json();

       if (!isObjectRecord(result)) {
         throw new Error('Unexpected body type: ProjectDetails.tsx');
       }

       const { listResult } = result;

       if (isWorkLogWithEmployeeArray(listResult)) {
         setLogsForWeekWithEmployee(listResult);
       }
     } catch (err: unknown) {
       if (err instanceof Error) {
         logger.error(err.message);
       }
     }
   }, [projectId, daysInWeek]);

   const getEmployeesForProject = useCallback(async() => {
     try {
       const numberId = Number(projectId);
       const response = await fetch('/api/users/forProject', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ numberId }),
         credentials: 'same-origin',
       });

       const result: unknown = await response.json();

       if (!isObjectRecord(result)) {
         throw new Error('Unexpected body type: ProjectDetails.tsx');
       }

       const { listResult } = result;

       console.log('employeesforProject listResult: ', listResult);
       if (isEmployeesForProjectArray(listResult)) {
         setEmployeesForProject(listResult);
       }
     } catch (err: unknown) {
       if (err instanceof Error) {
         logger.error(err.message);
       }
     }
   }, [projectId]);

   const updateBillingStatus = useCallback(async(boolValue: boolean) => {
     try {
       const numberId = projectWeek?.id;
       console.log('values sent: ', numberId);
       console.log('values sent: ', boolValue);
       await fetch('/api/projectWeek', {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ numberId, boolValue }),
         credentials: 'same-origin',
       });
     } catch (err: unknown) {
       if (err instanceof Error) {
         logger.error(err.message);
       }
     }
   }, [projectWeek?.id]);

   const changeToPrevWeek = useCallback((): void => {
     setCurrentDate((currDate: Date): Date => {
       const Year = currDate.getFullYear();
       const Month = currDate.getMonth();
       const Day = currDate.getDate();
       return new Date(Year, Month, Day - 7);
     });
   }, []);

   const changeToNextWeek = useCallback((): void => {
     setCurrentDate((currDate: Date): Date => {
       const Year = currDate.getFullYear();
       const Month = currDate.getMonth();
       const Day = currDate.getDate();
       return new Date(Year, Month, Day + 7);
     });
   }, []);

   // refactor sort work logs by username
   //  const compareUserObjects = (
   //    a: UserIdNameEmailRoleActivePhone,
   //    b: UserIdNameEmailRoleActivePhone
   //  ): number => {
   //    const userA = a.username;
   //    const userB = b.username;

   //    if (userA > userB) {
   //      return 1;
   //    }
   //    if (userA < userB) {
   //      return -1;
   //    }
   //    return 0;
   //  };

   // const sortedUserList = [...userList].sort(compareUserObjects);

   const toggleBillingOrDetails = useCallback(() => {
     setBillingsOrDetails(!billingsOrDetails);
   }, [billingsOrDetails]);

   const toggleAssignEmployeeForm = useCallback(() => {
     setShowAssignEmployeeForm(!showAssignEmployeeForm);
   }, [showAssignEmployeeForm]);

   const toggleInvoiceLinkForm = useCallback(() => {
     setShowInvoiceForm(!showInvoiceForm);
   }, [showInvoiceForm]);

   // TODO: add fetch request here to change billing status
   const toggleBillingStatusForDropdown = useCallback(
     async(e: ChangeEvent<HTMLSelectElement>) => {
       if (e.target.value === 'Paid') {
         console.log('reach here');
         setBillingStatusForDropdown(true);
         await updateBillingStatus(true);
       } else if (e.target.value === 'Not paid') {
         setBillingStatusForDropdown(false);
         await updateBillingStatus(false);
       }
     },
     [updateBillingStatus],
   );

   useEffect(() => {
     getProjectList().catch((err) => {
       logger.error(err);
     });
     getUserList().catch((err) => {
       logger.error(err);
     });
     fetchProjectWeek().catch((err) => {
       logger.error(err);
     });
     getWorkLogsWithEmployee().catch((err) => {
       logger.error(err);
     });
     getEmployeesForProject().catch((err) => {
       logger.error(err);
     });
   }, [getProjectList,
     getUserList,
     fetchProjectWeek,
     getWorkLogsWithEmployee,
     getEmployeesForProject]);

   return (
     <div className={styles.container}>
       {showAssignEmployeeForm
       && (
         <AdminAssignEmployee
           projectTitle={thisProject.title}
           employeesForProject={employeesForProject}
           toggleAssignEmployeeForm={toggleAssignEmployeeForm}
         />
       )}
       <div className={styles.navigationBar}>
         <div className={styles.leftSide}>
           <div className={styles.returnButton}>
             <Link to="/admin-portal-projects">
               <ChevronLeftIcon />
               <p>Return to main list</p>
             </Link>
           </div>
           <div className={styles.tabMenu}>
             {billingsOrDetails
               ? (
                 <Button
                   size={ButtonSize.Medium}
                   variant={ButtonVariant.Primary}
                   onClick={toggleBillingOrDetails}
                 >
                   Billings
                 </Button>
               )
               : (
                 <Button
                   size={ButtonSize.Medium}
                   variant={ButtonVariant.Outlined}
                   onClick={toggleBillingOrDetails}
                 >
                   Billings
                 </Button>
               )}
             {billingsOrDetails
               ? (
                 <Button
                   size={ButtonSize.Medium}
                   variant={ButtonVariant.Outlined}
                   onClick={toggleBillingOrDetails}
                 >
                   Details
                 </Button>
               )
               : (
                 <Button
                   size={ButtonSize.Medium}
                   variant={ButtonVariant.Primary}
                   onClick={toggleBillingOrDetails}
                 >
                   Details
                 </Button>
               )}
           </div>
         </div>

         <Button
           size={ButtonSize.Large}
           variant={ButtonVariant.Primary}
           onClick={toggleAssignEmployeeForm}
         >
           Assign employee
         </Button>
       </div>
       <div className={styles.projectWeekInfo}>
         <div>
           <label>Period</label>
           <div className={styles.weekDisplay}>
             <button type="button" onClick={changeToPrevWeek}>
               <ChevronLeftIcon />
             </button>
             <div>
               { isCurrentWeek
                 ? (
                   <p>
                     This week (
                     {daysInWeek[0].toLocaleString('en-US', monthConfig)}
                     {' '}
                     {daysInWeek[0].toLocaleString('default', dayConfig)}
                     {' '}
                     -
                     {' '}
                     {daysInWeek[6].toLocaleString('en-US', monthConfig)}
                     {' '}
                     {daysInWeek[6].toLocaleString('default', dayConfig)}
                     )
                   </p>
                 )
                 : (
                   <p>
                     (
                     {daysInWeek[0].toLocaleString('default', monthConfig)}
                     {' '}
                     {daysInWeek[0].toLocaleString('default', dayConfig)}
                     {' '}
                     -
                     {' '}
                     {daysInWeek[6].toLocaleString('default', monthConfig)}
                     {' '}
                     {daysInWeek[6].toLocaleString('default', dayConfig)}
                     )
                   </p>
                 )}
             </div>
             <button type="button" onClick={changeToNextWeek}>
               <ChevronRightIcon />
             </button>
           </div>
         </div>
         <div className={styles.invoiceContainer}>
           <label>Invoice link</label>
           <div className={styles.invoiceInput}>
             <p>Create a link</p>
             <button type="button" onClick={toggleInvoiceLinkForm}>
               <EditIcon />
             </button>
           </div>
         </div>
         <div className={styles.dropdownContainer}>
           <label>Billing status</label>
           <select
             value={billingStatusForDropdown ? 'Paid' : 'Not paid'}
             onChange={toggleBillingStatusForDropdown}
           >
             <option
               value="Not paid"
             >
               Not paid
             </option>
             <option
               value="Paid"
             >
               Paid
             </option>
           </select>

         </div>
       </div>

       {billingsOrDetails
         ? (
           <ProjectBillings />
         )
         : (
           <div>billings component here</div>
       // ProjectFullDetails
         )}
     </div>

   );
 };

export default ProjectDetails;
