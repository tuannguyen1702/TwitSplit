import { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { hasWordNoSpace, splitString, prepareString } from 'utils';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '12px',
  },
}));

export default ({ onSend }) => {
  const classes = useStyles();
  const [message, updateMessage] = useState('');
  const [error, setError] = useState(false);
  const addTask = () => {
    if (onSend && message) {
      setError(false);
      if(hasWordNoSpace(message)) {
        setError(true);
      } 
      
      const newString = prepareString(message);
      const result = splitString(newString);
      
      onSend(result);

      
    }
    updateMessage('');
  };
  return (
    <form noValidate onSubmit={(e) => {
      e.preventDefault()
      addTask()
    }}>
        <TextField
          label='Input Message'
          fullWidth={true}
          multiline
          rows={6}
          variant='outlined'
          value={message}
          onChange={(e) => updateMessage(e.currentTarget.value)}
        />
        <Button style={{'margin': '15px 0'}} type="submit" variant='contained' color='primary'>
          Send
        </Button>
        {error && <label
            style={{
              display: 'block',
              fontFamily: 'Roboto',
              fontWeight: '400',
              color: 'red',
            }}
          >
            Input message error
          </label>}
    </form>
  );
};
