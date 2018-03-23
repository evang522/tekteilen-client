import React from 'react';
import './css/MembersList.css';

export class MembersList extends React.Component{

    render() {
      
    const projectMembers = this.props.project.volunteers && this.props.users ? this.props.users.filter(user => {
      return this.props.project.volunteers.includes(Number(user.id));
    }) : [];
    return (
      <div className='members-list-container'>
        <ul>
        <li className='members-list-member'>
          <h3>Members: {projectMembers.length=== 0 ? 'Nobody\'s Here!' : projectMembers.length}</h3>
        </li>
        {projectMembers ? projectMembers.map(member => {
          return (

            <li key={member.id} className='members-list-member'>
              <div className='name-circle'>
              {member.fullname.split(' ')[0].split('')[0]}
              </div>
              <div className='full-name'>
                <a href={'mailto:'+member.email}>{member.fullname}</a>
                
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