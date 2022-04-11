import React, { useContext } from 'react';
import { useQuery, useMutation } from 'react-query';
import { getData, deleteData, putData } from '../../utils/httpbaseUtils';

import Loader from '../Common/Loader';

import TodoContext from '../../Context';

const List = (props) => {
  const { queryClient } = useContext(TodoContext);

  const fetchTodoResult = useQuery('getTodos', () => getData('task'));

  const deleteTodoMutation = useMutation(
    (id) => {
      return deleteData('task', id);
    },
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries('getTodos');
      },
    }
  );

  const updateMutation = useMutation(
    ({ id, payload }) => {
      return putData(`task/${id}`, payload);
    },
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries('getTodos');
      },
    }
  );

  const todos = fetchTodoResult?.data?.data?.data;
  const todoCounts = fetchTodoResult?.data?.data?.count;

  const handleUpdateTask = (id, status) => {
    updateMutation.mutate({ id, payload: { completed: !status } });
  };

  const handleDeleteClick = (id) => {
    deleteTodoMutation.mutate(id);
  };

  return (
    <div className="todo-items-card">
      <h2 className="todo-title">Todos {todoCounts && `(${todoCounts})`}</h2>

      {(fetchTodoResult?.isLoading ||
        fetchTodoResult?.isRefetching ||
        deleteTodoMutation?.isLoading ||
        updateMutation?.isLoading) && <Loader />}

      {todoCounts === 0 && <div>You dont have any tasks right now</div>}

      <ul className="list-container">
        {todos?.map((todoItem) => (
          <div className="todo-list" key={todoItem?.id}>
            <li
              className={`todo-items ${
                todoItem?.completed ? 'text-strike' : ''
              }`}
            >
              {todoItem?.description}
            </li>

            <div className="todo-actions">
              <button
                className={`btn action-btn ${
                  todoItem?.completed ? 'btn-secondary' : ''
                }`}
                onClick={() =>
                  handleUpdateTask(todoItem?._id, todoItem?.completed)
                }
              >
                Mark {todoItem?.completed ? 'Incomplete' : 'Complete'}
              </button>

              <button
                className="btn btn-delete action-btn"
                onClick={() => handleDeleteClick(todoItem?._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default List;
