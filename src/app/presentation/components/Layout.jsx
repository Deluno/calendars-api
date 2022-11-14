import { Outlet } from "react-router-dom";
import { Layout as AntLayout } from "antd";

const { Header, Footer, Content } = AntLayout;

const Layout = () => {
    return <AntLayout style={{minHeight: "100vh"}}>
        <Header>Header</Header>
        <Content style={{ padding: '0 2em' }}><Outlet /></Content>
        <Footer>Footer</Footer>
    </AntLayout>
}

export default Layout