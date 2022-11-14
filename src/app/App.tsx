import { Breadcrumb, Spin, Col } from 'antd';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './presentation/components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: (
          <Col xs={{ span: 24 }} lg={{ span: 16, offset: 4 }}>
            <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background">Content</div>
          </Col>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} fallbackElement={<Spin />} />;
}

export default App;
