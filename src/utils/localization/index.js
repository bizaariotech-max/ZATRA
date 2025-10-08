// let __TOKEN =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4MjllN2Q3YWRmYjAwNDBlMTQ5YWNiIn0sImlhdCI6MTcwNDQ0MDMxNn0.qwMutA74p44_DhBsrWABuufb4Oiz4A4an3a105tPDLQ";

// let __USER = {
//     __v: 0,
//     _id: "65829e7d7adfb0040e149acb",
//     admin: "65829c22499a0c8f40239c03",
//     createdAt: "2023-12-20T07:57:49.205Z",
//     email: "user1@gmail.com",
//     isActive: true,
//     limit: "65829c22499a0c8f40239c01",
//     name: "User",
//     phone: 999999,
//     role: "MANAGER",
//     updatedAt: "2023-12-20T07:57:49.205Z",
// };

export function __setToken(authToken, user) {
    console.log(authToken, user);
    __TOKEN = authToken;
    __USER = user;
}

export function __getToken() {
    return __TOKEN;
}
export function __getUser() {
    return __USER;
}
