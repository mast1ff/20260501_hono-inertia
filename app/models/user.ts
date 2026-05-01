export type UserType = {
  id: number;
  name: string;
  email: string;
  bio: string;
};

const users: UserType[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Software developer",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    bio: "Graphic designer",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    bio: "Content writer",
  },
];

let nextId = users.length + 1;

export class User {
  static list(): UserType[] {
    return users;
  }

  static retrieve(id: number): UserType | undefined {
    return users.find((user) => user.id === id);
  }

  static create(input: Omit<UserType, "id">): UserType {
    nextId = nextId++;
    const newUser: UserType = {
      id: nextId,
      ...input,
    };
    users.push(newUser);
    return newUser;
  }
}
