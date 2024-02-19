import type { FunctionComponent } from 'react';
import React from 'react';
import type { ProjectAndBilling } from '../../../common/utilities/types';
import IndividualProject from '../IndividualProjects/IndividualProjects';

type AdminDisplayProjectsProps = {
  projectListSlice: ProjectAndBilling[];
};

const AdminDisplayProjects: FunctionComponent<AdminDisplayProjectsProps>
 = (props) => {
   const { projectListSlice } = props;

   const displayProjects = (listOfProjects: ProjectAndBilling[]):
   React.ReactElement[] => {
     if (typeof listOfProjects === 'undefined') {
       return [];
     }
     const projectElements: React.ReactElement[] = [];

     for (const project of listOfProjects) {
       projectElements.push((
         <div
           key={`project-${project.id}`}
         >
           <IndividualProject
             id={project.id} clientId={project.clientId}
             title={project.title} description={project.description}
             startDate={project.startDate} status={project.status}
             totalBilling={project.totalBilling}
           />
         </div>));
     }
     return projectElements;
   };
   return (
     <div>
       {displayProjects(projectListSlice)}
     </div>
   );
 };

export default AdminDisplayProjects;
