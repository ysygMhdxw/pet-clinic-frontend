import {Button} from "antd";
import Card from "antd/es/card/Card";

function AuthSelection() {

    return (
        <div>

            <h1 style={{display:'flex',justifyContent:'center'}}>欢迎来到我们的网站</h1>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Card style={{width: 300, margin: 20,justifyContent:'center'}}>
                    <img src="https://via.placeholder.com/150x150" alt="前台管理"/>
                    <h3>前台管理</h3>
                    <Button type="primary" href="/frontend">进入前台管理</Button>
                </Card>
                <Card style={{width: 300, margin: 20}}>
                    <img src="https://via.placeholder.com/150x150" alt="后台管理"/>
                    <h3>后台管理</h3>
                    <Button type="primary" href="/backend">进入后台管理</Button>
                </Card>
            </div>
        </div>
    );
}

export default AuthSelection;