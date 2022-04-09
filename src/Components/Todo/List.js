import React, { useContext } from 'react';
import { useQuery, useMutation } from 'react-query';
import { getData, deleteData, putData } from '../../utils/httpbaseUtils';

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
    <section>
      <h3>Todos</h3>

      {(fetchTodoResult?.isLoading ||
        fetchTodoResult?.isRefetching ||
        deleteTodoMutation?.isLoading ||
        updateMutation?.isLoading) && <div>loading...</div>}

      {todoCounts === 0 && <div>You dont have any tasks right now</div>}

      <ul className="todos">
        {todos?.map((todoItem) => (
          <div key={todoItem?.id}>
            <li className={todoItem?.completed ? 'text-strike' : ''}>
              {todoItem?.description}(
              {todoItem?.completed ? 'Complete' : 'Incomplete'})
            </li>
            <button
              onClick={() =>
                handleUpdateTask(todoItem?._id, todoItem?.completed)
              }
            >
              Mark as {todoItem?.completed ? 'incomplete' : 'complete'}
            </button>

            <button onClick={() => handleDeleteClick(todoItem?._id)}>
              Delete
            </button>
          </div>
        ))}
      </ul>
    </section>
  );
};

export default List;
