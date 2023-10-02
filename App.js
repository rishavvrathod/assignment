import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const API_URL = 'https://jsonplaceholder.typicode.com/comments';

const App = () => {
  const [comments, setComments] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    // Fetch 100 comments from the API
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setComments(data.slice(0, 100)));
  }, []);

  const handlePostSelect = postId => {
    // Filter comments based on the selected post
    const selectedComments = comments.filter(comment => comment.postId === postId);
    setSelectedPost(selectedComments);
  };

  return (
    <View style={styles.container}>
      {/* Posts Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Posts</Text>
        <ScrollView style={styles.sectionContent}>
          {comments.map(comment => (
            <TouchableOpacity key={comment.id} onPress={() => handlePostSelect(comment.postId)}>
              <View style={styles.commentContainer}>
                <Text>{comment.name}</Text>
                <Text>{comment.body}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Comments Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Comments</Text>
        <ScrollView style={styles.sectionContent}>
          {selectedPost &&
            selectedPost.map(comment => (
              <View key={comment.id} style={styles.commentContainer}>
                <Text>{comment.name}</Text>
                <Text>{comment.body}</Text>
              </View>
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  sectionContainer: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionContent: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  commentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default App;
