import React, { Suspense, useState, useTransition } from 'react';
import logo from './logo.svg';
import './App.css';
import { ComponentApp } from './homework/4';
// import TodoList from './components/TodoList/TodoList';
import TodoView from './components/TodoList/TodoView';

function App() {
  const [page, setPage] = useState('/');
  const [isPending, startTransition] = useTransition();
  function navigate(url: string) {
    startTransition(() => {
      setPage(url);
    });
  }
  let content;
  if (page === '/') {
    content = (
      <>
        <div className='App'>
          <header className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <p>Explore my application</p>
            <Suspense fallback={<BigSpinner />}>
              {/* <Router /> */}
              <button onClick={() => navigate('/the-menu')}>
                Open menu page
              </button>
              <button onClick={() => navigate('/todo')}>Open todo page</button>
            </Suspense>
          </header>
        </div>
      </>
    );
    // <IndexPage navigate={navigate} />;
  }
  if (page === '/the-menu') {
    content = (
      <main>
        <ComponentApp navigate={navigate} />
      </main>
    );
  }
  if (page === '/todo') {
    content = (
      <main>
        <TodoView navigate={navigate} />
      </main>
    );
  }
  // return <Layout isPending={isPending}>{content}</Layout>;

  return <div className='App'>{content}</div>;
}

// <main>
//   <Suspense fallback={<BigSpinner />}>
//     {/* <Router /> */}
//     <button onClick={() => navigate('/the-beatles')}>
//       Open The Beatles artist page
//     </button>
//   </Suspense>
// </main>;
// function Router() {
//   const [page, setPage] = useState('/');
//   const [isPending, startTransition] = useTransition();

//   function navigate(url: string) {
//     startTransition(() => {
//       setPage(url);
//     });
//   }

//   let content;
//   if (page === '/') {
//     content = <IndexPage navigate={navigate} />;
//   } else if (page === '/the-beatles') {
//     content = <ComponentApp />;
//   }
//   return <Layout isPending={isPending}>{content}</Layout>;
// }

function BigSpinner() {
  return <h2>🌀 Loading...</h2>;
}
export default App;
