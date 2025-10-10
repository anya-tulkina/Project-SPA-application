import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer.ts";

let state= {
    posts: [
        {id: 1, message: 'Hi', likesCount: 10},
        {id: 2, message: 'Bye', likesCount: 5},
    ]
}

it ('message of new post should be correct', () => {

    let action = addPostActionCreator("Hi, i'm Anna");

    let newState = profileReducer(state, action);

    expect(newState.posts[2].message).toBe("Hi, i'm Anna");

})

it ('length of posts should be incremented', () => {

    let action = addPostActionCreator("Hi, i'm Anna");

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(3);

})

it ('post should be delete', () => {

    let action = deletePost(1);

    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(1)
})