import MyMessage from "./MyMessage";
import MessageForm from "./MessageForm";
import TheirMessage from "./TheirMessage";
//destructuring chats,activechat,username,messages
const ChatFeed=(props)=>{
    const{ chats, activeChat, userName, messages } = props;//we have not declared this above cause we also want to keep the orignal as well create some changes
    const chat=chats && chats[activeChat]; // if chats exist find chats and then find active chats
    const renderReadReceipts = (message, isMyMessage) => chat.people.map((person, index) => person.last_read === message.id && (
        <div
          key={`read_${index}`}
          className="read-receipt"
          style={{
            float: isMyMessage ? 'right' : 'left',
            backgroundImage: person.person.avatar && `url(${person.person.avatar})`,
          }}
        />
      ));
    
    
    //console.log(chat, userName,messages);

    //for generating messages
    //keys is the array of ids of specific messages

    const renderMessages=()=>{
        const keys =Object.keys(messages);
       // console.log(keys);
       return keys.map((key, index) => {
        const message = messages[key];
        const lastMessageKey = index === 0 ? null : keys[index - 1];
        const isMyMessage = userName === message.sender.username;
  
        return (
          <div key={`msg_${index}`} style={{ width: '100%' }}>
            <div className="message-block">
              {isMyMessage
                ? <MyMessage message={message} />
                : <TheirMessage message={message} lastMessage={messages[lastMessageKey]} />}
            </div>
            <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
            {renderReadReceipts(message, isMyMessage)}
            </div>
          </div>
        );
      });
    };

    //renderMessages();
    //{chat?.title} ?. ensures chat comes before title

    if (!chat) return <div />;

    return (
      <div className="chat-feed">
        <div className="chat-title-container">
          <div className="chat-title">{chat?.title}</div>
          <div className="chat-subtitle">
            {chat.people.map((person) => ` ${person.person.username}`)}
          </div>
        </div>
        {renderMessages()}
        <div style={{ height: '100px' }} />
        <div className="message-form-container">
          <MessageForm {...props} chatId={activeChat} />
        </div>
      </div>
    );
  };
  
  export default ChatFeed;