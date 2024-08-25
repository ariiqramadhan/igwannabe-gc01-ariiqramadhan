import {
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
} from 'react-native';
import Tags from '../components/Tags';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST, GET_POSTS } from '../queries/query';
import Toast from 'react-native-root-toast';

const black = '#080814';

export default function AddPost({ navigation }) {
    const [addPost, {data, error, loading}] = useMutation(ADD_POST, {
        refetchQueries: [
            GET_POSTS
        ]
    });
    const [imageInput, setImageInput] = useState('');
    const [captionInput, setCaptionInput] = useState('');
    const [tagsInput, setTagsInput] = useState('');
    const [tags, setTags] = useState([]);

    function handleAddTag() {
        if (tagsInput) {
            setTags([...tags, tagsInput]);
            setTagsInput('');
        }
    }
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
              setTags([]);
              setCaptionInput('');
              setTagsInput('');
              setImageInput('');
        });
        return unsubscribe;
    }, [navigation]);

    async function handleAddPost() {
        try {
            await addPost({
                variables: {
                    newPost: {
                      content: captionInput,
                      imageUrl: imageInput,
                      tags: tags,
                    }
                }
            });
            navigation.navigate('MainHome');
        } catch (err) {
            let toast = Toast.show(err.graphQLErrors[0].message, {
                duration: 1500,
                hideOnPress: true,
                position: Toast.positions.TOP,
                backgroundColor: '#E53835',
                textColor: '#FFF',
                opacity: 1
            });
            console.log(err);
        }
    } 
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#FFF',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <View>
                <Text style={styles.label}>Image</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Image URL"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={setImageInput}
                    value={imageInput}
                />
            </View>
            <View>
                <Text style={styles.label}>Caption</Text>
                <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.inputCaption}
                    placeholder="Caption"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text) => setCaptionInput(text)}
                    value={captionInput}
                />
            </View>
            <View>
                <Text style={styles.label}>Tags</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        width: 300,
                    }}
                >
                    <TextInput
                        style={styles.inputTags}
                        placeholder="Tag"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={setTagsInput}
                        value={tagsInput}
                    />
                    <TouchableHighlight
                        style={{
                            backgroundColor: black,
                            padding: 10,
                            borderRadius: 5,
                        }}
                        onPress={handleAddTag}
                    >
                        <Text style={{ color: '#FFF' }}>Add Tag</Text>
                    </TouchableHighlight>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: 300,
                        flexWrap: 'wrap',
                        gap: 5,
                        marginTop: 10,
                    }}
                >
                    <Text>Tags:</Text>
                    {tags.map((tag, i) => <Tags key={i} tag={tag}/>)}
                </View>
            </View>
            <TouchableHighlight
                style={{
                    backgroundColor: '#0095F6',
                    width: 300,
                    padding: 15,
                    borderRadius: 30,
                    marginTop: 30
                }}
                underlayColor={'#0075C2'}
                onPress={handleAddPost}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#FFF',
                    }}
                >
                    Add Post
                </Text>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4.65,
        elevation: 8,
        shadowColor: '#9D9D9D',
        width: 300,
        marginBottom: 15,
        borderRadius: 10,
        padding: 15,
        backgroundColor: '#FFF',
    },
    inputTags: {
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4.65,
        elevation: 8,
        shadowColor: '#9D9D9D',
        borderRadius: 10,
        padding: 15,
        backgroundColor: '#FFF',
        flex: 1,
    },
    inputCaption: {
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4.65,
        elevation: 8,
        shadowColor: '#9D9D9D',
        width: 300,
        marginBottom: 15,
        borderRadius: 10,
        padding: 15,
        backgroundColor: '#FFF',
        height: 100,
        textAlignVertical: 'top',
    },
    label: {
        marginBottom: 5,
        color: black,
        textAlign: 'center',
        fontWeight: '600',
    },
});
