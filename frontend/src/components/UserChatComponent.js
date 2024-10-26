import { Fragment } from "react";
function UserChatComponent() {
  return (
    <>
      <input type="checkbox" id="checkbox" />
      <label htmlFor="checkbox" className="chat-btn">
        <i className="bi bi-chat-dots comment"></i>
        <i className="bi bi-x-circle  close"></i>
        <span className="position-absolute top-.5 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2">
          <span className="visually-hidden">unread messages</span>
        </span>
      </label>
      <div className="chat-window">
        <div className="chat-header">
          <h6>Chat me for any details</h6>
        </div>
        <div className="chat-form">
          <div className="chat-mes">
            {Array.from({ length: 20 }).map((_, i) => (
              <Fragment key={i}>
                <p>
                  {" "}
                  <b>you wrote :</b> Hellow How are you ?
                </p>
                <p className="bg-primary rounded-pill text-light p-2 ms-1">
                  {" "}
                  <b>support wrote: </b>fine thanks
                </p>
              </Fragment>
            ))}
          </div>
          <textarea
            className="text-area"
            placeholder="Enter question ..!"
          ></textarea>
          <button className="submitchat">submit</button>
        </div>
      </div>
    </>
  );
}

export default UserChatComponent;
