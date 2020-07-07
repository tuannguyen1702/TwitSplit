
export default ({ children }) => {
  return (
    <>
      <li className="message-list__item">
        <p className="message">{children}</p>
      </li>
      <style jsx>{
        `.message-list__item {
          padding: 12px 12px;
          margin: 4px 0px;
          display: flex;
          background: #fbfbfb;
          border-radius: 4px;
          border: 1px solid #c1c1c1;
        }
        .message {
          flex: 1;
          margin: auto 0;
          font-family: 'Roboto';
        }
        .btn-group {
          display: flex;
        }
        `
      }</style>
    </>
  )
}