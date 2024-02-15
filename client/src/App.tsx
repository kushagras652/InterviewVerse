import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Create from "./pages/Create";
import MyInterviewTracks from "./pages/MyInterviewTracks";
import MySinglePost from "./pages/MySinglePost";
import Update from "./pages/Update";
import SinglePost from "./pages/SinglePost";
import UserProfile from "./pages/UserProfile";
import MyLists from "./pages/MyLists";
import InterviewTrackExplore from "./pages/InterviewTrackExplore";
import DefaultReadingList from "./pages/DefaultReadingList";
import CustomListsPosts from "./pages/CustomListPosts";
import SavedLists from "./pages/SavedLists";
import ReadingHistory from "./pages/ReadingHistory";
import UserReadingList from "./pages/UserReadingList";
import UserCustomLists from "./pages/UserCustomLists";
import ProtectedRoute from "./components/ProtectedRoute";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer/> */}
    </>
  );
};

// I have created two types of Layouts

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path : "/interview-tracks",
        element : <InterviewTrackExplore/>
      },
      {
        path: "/:id/:id",
        element: <SinglePost />,
      },
      {
        path: "/:username",
        element: <UserProfile />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path : "/me/lists",
        element : (
          <ProtectedRoute>
            <MyLists/>
          </ProtectedRoute>
        )
      },
      {
        path : "/me/lists/custom/:id",
        element : (
          <ProtectedRoute>
          <CustomListsPosts/>
          </ProtectedRoute>
        )
      },
      {
        path : "/me/lists/default",
        element : (
          <ProtectedRoute>
            <DefaultReadingList/>
          </ProtectedRoute>
        ) 
      },
      {
        path: "/me/interview-tracks",
        element:(
          <ProtectedRoute>
            <MyInterviewTracks />
          </ProtectedRoute>
        )
      },
      {
        path: "/:id/interview-tracks/:id",
        element: (
          <ProtectedRoute>
            <MySinglePost />
          </ProtectedRoute>
        )
      },
      {
        path: "/:id/interview-tracks/:id/update",
        element: (
          <ProtectedRoute>
            <Update />
          </ProtectedRoute>
        )
      },
      {
        path : "/:username/reading-lists",
        element : (
          <ProtectedRoute>
          <UserReadingList/>
          </ProtectedRoute>
        )
      },
      {
        path : "/:username/reading-lists/:id",
        element : (
          <ProtectedRoute>
          <UserCustomLists/>
          </ProtectedRoute>
        )
      },
      {
        path : "/me/saved-lists",
        element : (
          <ProtectedRoute>
          <SavedLists/>
          </ProtectedRoute>
        )
      },
      {
        path : "/me/reading-history",
        element : (
          <ProtectedRoute>
          <ReadingHistory/>
          </ProtectedRoute>
        )
      }
    ],
  },
  {
    path: "/register", //* This means that at register and Login page,we wont be seeing navbar and footer
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);


// const router2 = createBrowserRouter([
//   {
//     path : "/",
//     element : <Layout/>,
//     children : [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/post/:id",
//         element: <Single />,
//       },
//       {
//         path: "/create",
//         element: <Create />,
//       },
//       {
//         path : "/login",
//         element : <Login/>
//       },{
//         path : "register",
//         element : <Register/>
//       }
//     ]
//   }
// ])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
