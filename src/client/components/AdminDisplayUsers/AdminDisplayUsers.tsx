import type { FunctionComponent } from 'react';
import React from 'react';
import type { UserIdNameEmailRoleActivePhone } from '../../../server/database';
import IndividualUser from '../IndividualUser/IndividualUser';

type AdminDisplayUsersProps = {
  userListSlice: UserIdNameEmailRoleActivePhone[];
};

const AdminDisplayUsers: FunctionComponent<AdminDisplayUsersProps>
 = (props) => {
   const { userListSlice } = props;
   const displayUsers = (users: UserIdNameEmailRoleActivePhone[]):
   React.ReactElement[] => {
     if (typeof users === 'undefined' || users.length === 0) {
       return [];
     }
     const userElements: React.ReactElement[] = [];

     for (const user of users) {
       const { username } = user;
       const { email } = user;
       const { id } = user;
       const { role } = user;
       const { active } = user;
       const { phone } = user;
       const { reason } = user;
       userElements.push((
         <div
           key={`user-${id}`}
         >
           <IndividualUser
             username={username}
             email={email}
             role={role}
             id={id}
             active={active}
             phone={phone}
             reason={reason}
           />
         </div>));
     }
     return userElements;
   };

   return (
     <div>
       {displayUsers(userListSlice)}
     </div>
   );
 };

export default AdminDisplayUsers;
