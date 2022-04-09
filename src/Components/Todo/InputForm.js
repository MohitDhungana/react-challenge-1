import React, { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import TodoContext from '../../Context';
import { postData } from '../../utils/httpbaseUtils';

const wordRegex = new RegExp(/postpone+/i);

const TodoForm = (props) => {
  const { queryClient } = useContext(TodoContext);

  const [inputText, setInputText] = useState('');
  const [error, setError] = useState({
    message: '',
    visible: false,
  });

  const addTodoMutation = useMutation(
    (data) => {
      return postData('task', data);
    },
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries('getTodos');
      },
    }
  );

  const handleInputText = (e) => {
    setInputText(e.target.value);
  };

  const handleClear = () => {
    setInputText('');
    setError({
      message: '',
      visible: false,
    });
  };

  const handleTextAdd = (e) => {
    e.preventDefault();
    if (inputText?.length === 0) {
      setError({
        message: `Todo item should not be empty`,
        visible: true,
      });
      return;
    }
    if (wordRegex.test(inputText)) {
      setError({
        message: `Todo cannot contain word "postpone" in any format`,
        visible: true,
      });
      return;
    }

    addTodoMutation.mutate({ description: inputText });
    handleClear();
  };

  return (
    <>
      <form>
        <input type="text" value={inputText} onChange={handleInputText} />
        <button type="submit" onClick={handleTextAdd}>
          {`Add${addTodoMutation?.isLoading ? 'ing...' : ''}`}
        </button>
        <button type="button" onClick={handleClear}>
          Reset
        </button>
      </form>

      {error?.visible && <div className="error-text">{error?.message}</div>}
    </>
  );
};

export default TodoForm;
