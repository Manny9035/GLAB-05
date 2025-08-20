import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  // Add new task
  const addTask = () => {
    if (taskText.trim() === '') {
      Alert.alert('Error', 'Task cannot be empty');
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      text: taskText,
      done: false,
    };
    setTasks([...tasks, newTask]);
    setTaskText('');
  };

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Render each task item
  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => toggleTask(item.id)}>
        <Text style={styles.checkbox}>{item.done ? '☑️' : '⬜'}</Text>
      </TouchableOpacity>
      <Text
        style={[styles.taskText, item.done && styles.taskTextDone]}
        onPress={() => toggleTask(item.id)}
      >
        {item.text}
      </Text>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteButton}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Input row */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter new task"
          value={taskText}
          onChangeText={setTaskText}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Task list */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'lightblue',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  taskTextDone: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  checkbox: {
    marginRight: 10,
    fontSize: 20,
  },
  deleteButton: {
    marginLeft: 10,
    fontSize: 18,
    color: 'red',
  },
});
