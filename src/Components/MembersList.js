import React from 'react';
import './css/MembersList.css';

export class MembersList extends React.Component{

    render() {
      console.log('members component re-rendered');
      console.log('volunteers: ', this.props.project ? this.props.project.volunteers : '');
      
    const projectMembers = this.props.project.volunteers && this.props.users ? this.props.users.filter(user => {
      return this.props.project.volunteers.includes(Number(user.id));
    }) : [];
    return (
      <div className='members-list-container'>
        <ul>
        <li className='members-list-member'>
          <h3>Members</h3>
        </li>
        {projectMembers ? projectMembers.map(member => {
          return (

            <li key={member.id} className='members-list-member'>
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