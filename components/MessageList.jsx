export default ({ children }) => {
  return (
    <>
      <ul className="message-list">
        {children}
      </ul>
      <style jsx>{
        `.message-list {
          border: 0;
          padding: 0;
          margin: 0;
          background: #FFF;
        }`
      }</style>
    </>
  )
}