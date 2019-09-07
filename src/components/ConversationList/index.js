import React, { Component } from 'react';
// import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
// import Toolbar from '../Toolbar';
// import ToolbarButton from '../ToolbarButton';
// import axios from 'axios';

import './ConversationList.css';

export default class ConversationList extends Component {

  state = {

  }

  render() {
    return (
      <div className="conversation-list">
        {
          this.props.users.map(user =>
            <ConversationListItem
              key={user.id}
              name={user.name}
            />
          )
        }
      </div>
    );
  }
}










// getConversations = () => {
//   axios.get('https://randomuser.me/api/?results=20').then(response => {
//     this.setState(prevState => {
//       let conversations = response.data.results.map(result => {
//         return {
//           photo: result.picture.large,
//           name: `${result.name.first} ${result.name.last}`,
//           text: 'Hello world! This is a long message that needs to be truncated.'
//         };
//       });
//
//       return { ...prevState, conversations };
//     });
//   });
// }





















// <Toolbar
// title="Messenger"
// leftItems={[
//   <ToolbarButton key="cog" icon="ion-ios-cog" />
// ]}
// rightItems={[
//   <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
// ]}
// />
// <ConversationSearch />
