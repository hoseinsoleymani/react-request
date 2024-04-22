# React-Request (Observer Pattern)

React-Request is a project that helps you handle API requests in your React project. It provides a custom hook for managing cache, handling refetching, errors, and loading states in a lightweight manner.

## Installation

You can install React-Request using npm:

```pnpm add react-request```

React-Request has no any external dependencies and only uses Axios for handling API requests.

To build the project, run:

```pnpm build```


To run the project, run:

```pnpm run dev```


To lint the project, run:

```pnpm run lint```

## Usage

### Custom Hook: useQuery

The useQuery custom hook provided by React-Request allows you to manage API requests with cache handling, refetching, error handling, and loading state management.

#### Example Usage:

```import React from 'react';
import useQuery from 'react-request';

const MyComponent = () => {
  const { data, isLoading, error, refetch } = useQuery();

  useEffect(() => {
    refetch('https://api.example.com/data');
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {data && <div>{data}</div>}
    </div>
  );
};

export default MyComponent;
```

In this example, the useQuery hook manages the API request to https://api.example.com/data, handles loading state, errors, and caches the response data for future use.

### Features:

- **Cache Management:** React-Request uses the Observer design pattern to handle cache management efficiently.
- **Refetching:** You can easily trigger a refetch of the API data when needed.
- **Error Handling:** React-Request provides error handling for API requests.
- **Loading State:** The hook manages loading state to display loading indicators while fetching data.

## Contributing

If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/hoseinsoleymani/react-request).