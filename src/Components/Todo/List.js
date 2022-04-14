import React, { useContext } from 'react';
import { useQuery, useMutation } from 'react-query';
import { getData, deleteData, putData } from '../../utils/httpUtil';

import Loader from '../Common/Loader';

import TodoContext from '../../Context';

import './list.css';

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

  const getTodoCount = () => {
    const completeTodoCount = todos?.filter((item) => item?.completed)?.length;
    return `${completeTodoCount}/${todoCounts}`;
  };

  return (
    <div className="todo-items-card">
      <h2 className="todo-title">
        Todos {todoCounts > 0 && `(${getTodoCount()})`}
      </h2>

      {(fetchTodoResult?.isLoading ||
        fetchTodoResult?.isRefetching ||
        deleteTodoMutation?.isLoading ||
        updateMutation?.isLoading) && <Loader />}

      {todoCounts === 0 && (
        <div style={{ textAlign: 'center' }}>
          You dont have any tasks right now
        </div>
      )}

      <ul className="list-container">
        {todos?.map((todoItem) => (
          <div className="todo-list" key={todoItem?._id}>
            <li
              className={`todo-items ${
                todoItem?.completed ? 'incomplete-item' : ''
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
