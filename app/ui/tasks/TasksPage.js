import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Stack,
  Text,
  Spinner,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { TaskItem } from './TaskItem';
import { TasksCollection } from '../../tasks/tasks.collection';
import { TaskForm } from './TaskForm';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksHeader } from './TasksHeader';

const markAsDone = ({ _id }) => Meteor.call('tasks.toggleDone', _id);

const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);

/* eslint-disable import/no-default-export */
export default function TasksPage({ user }) {
  const [hideDone, setHideDone] = useState(false);
  const { tasks, pendingCount, allCount, isLoading } = useTracker(() => {
    const doneFilter = { done: { $ne: true } };
    const userFilter = user ? { userId: user._id } : {};
    const pendingOnlyFilter = { ...doneFilter, ...userFilter };
    const noDataAvailable = { tasks: [], pendingCount: 0, allCount: 0 };

    if (!user) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('tasks');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasksData = TasksCollection.find(
      hideDone ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();

    const pending = TasksCollection.find(pendingOnlyFilter).count();
    const all = TasksCollection.find({}).count();

    return { tasks: tasksData, pendingCount: pending, allCount: all };
  });

  return (
    <>
      <TasksHeader />
      <TaskForm />
      {isLoading ? (
        <Spinner />
      ) : (
        <Box
          mt={8}
          py={{ base: 2 }}
          px={{ base: 4 }}
          pb={{ base: 4 }}
          border={1}
          borderStyle="solid"
          borderRadius="md"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
          <HStack mt={2}>
            <Box w="70%">
              <Text
                as="span"
                color={useColorModeValue('gray.500', 'gray.400')}
                fontSize="xs"
              >
                You have {allCount} {allCount === 1 ? 'task ' : 'tasks '}
                and {pendingCount} pending.
              </Text>
            </Box>
            <Stack w="30%" justify="flex-end" direction="row">
              <Button
                colorScheme="teal"
                size="xs"
                onClick={() => setHideDone(!hideDone)}
              >
                {hideDone ? 'Show All Tasks' : 'Show Pending'}
              </Button>
            </Stack>
          </HStack>

          {tasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onMarkAsDone={markAsDone}
              onDelete={deleteTask}
            />
          ))}
        </Box>
      )}
    </>
  );
}