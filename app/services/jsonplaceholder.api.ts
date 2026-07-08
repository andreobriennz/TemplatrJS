const ky = require('ky');
const settings = require('../../settings.ts');

const api = ky.create({
    prefixUrl: settings.apis.jsonplaceholder.url // 'https://jsonplaceholder.typicode.com'
});

interface Todo {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
}

interface User {
    id: number;
    username: number;
    name: number;
    email: string;
    phone: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        },
    },
    website: string;
    company: {
        name: string;
        catchPhase: string;
        bs: string;
    }
}

interface Post {
    id: string;
    userId: string;
    title: string;
    body: string;
}

interface Comment {
    id: string;
    postId: string;
    name: string;
    email: string;
    body: string;
}

const routes = {
    todos: {
        index: async () : Promise<Todo[]> => {
            return await api.get('todos').json();
        },
        show: async (id: number) : Promise<Todo[]> => {
            return await api.get(`todos/${id}`).json()
        }
    },
    users: {
        index: async () : Promise<User[]> => {
            return await api.get('users').json();
        },
        show: async (id: number) : Promise<User> => {
            return await api.get(`users/${id}`).json()
        }
    },
    posts: {
        index: async () : Promise<Post[]> => {
            return await api.get('posts').json();
        },
        show: async (id: number) : Promise<Post> => {
            return await api.get(`posts/${id}`).json();
        },
        comments: {
            index: async (postId: number) : Promise<Comment[]> => {
                return await api.get(`posts/${postId}/comments`).json();
            },
            show: async (postId: number, commentId: number) : Promise<Comment | undefined> => {
                const comments = await api.get(`posts/${postId}/comments`).json() as Comment[];
                return comments.find(comment => comment.id === commentId.toString());
            },
        }
    }
}

module.exports = routes
