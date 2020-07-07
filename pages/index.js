import Head from 'next/head';
import { useState } from 'react';
import MessageList from 'components/MessageList';
import MessageListItem from 'components/MessageListItem';
import MessageInput from 'components/MessageInput';
export default function Home() {
  const [messages, setMessages] = useState([]);
  return (
    <div className='container'>
      <Head>
        <title>TwitSplit App</title>
        <link rel='icon' href='/favicon.ico' />
        <link
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Roboto+Mono:400,500|Material+Icons'
          rel='stylesheet'
        />
      </Head>
      <main style={{ maxWidth: '966px', margin: 'auto' }}>
        <MessageInput onSend={(message) => setMessages([...message])} />
        {messages && messages.length > 0 && (
          <h3 style={{ 'font-family': 'Roboto', 'font-weight': '400' }}>
            Message List
          </h3>
        )}
        <MessageList>
          {messages.map((message, i) => {
            return <MessageListItem key={i}>{message}</MessageListItem>;
          })}
        </MessageList>
      </main>
    </div>
  );
}
