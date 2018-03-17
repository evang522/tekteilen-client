import React from 'react';
import './css/MembersList.css';

export class MembersList extends React.Component{

    render() {
      console.log('these are the memberslist props', this.props);

      
    const projectMembers = this.props.project.volunteers && this.props.users ? this.props.users.filter(user => {
      return this.props.project.volunteers.includes(Number(user.id));
    }) : [];
    console.log(projectMembers);

    return (
      <div className='members-list-container'>
        <ul>
        <li className='members-list-member'>
          <h3>Members</h3>
        </li>
        {projectMembers ? projectMembers.map(member => {
          return (

            <li className='members-list-member'>
              <div className='name-circle'>
              {member.fullname.split(' ')[0].split('')[0]}
              </div>
              <div className='full-name'>
                {member.fullname}
              </div>
            </li>
          )
        }): ''}
        </ul>
      </div>
    )
  }
}



export default MembersList;