import { Admin, ListGuesser, Resource } from "react-admin";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import PersonIcon from "@mui/icons-material/Person";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { API_BASE } from "./constants";
import drfProvider, { fetchJsonWithAuthToken } from "./dataProvider";
import { tokenAuthProvider } from "./dataProvider";
import "./index.css";
import ProductCreate from "./resources/product/ProductCreate";
import ProductTypeCreate from "./resources/productType/ProductTypeCreate";
import ProductList from "./resources/product/ProductList";
import ProductTypeList from "./resources/productType/ProductTypeList";
import ProductEdit from "./resources/product/ProductEdit";
import ProductTypeEdit from "./resources/productType/ProductTypeEdit";
import ItemList from "./resources/item/ItemList";
import MemberList from "./resources/member/MemberList";
import ItemCreate from "./resources/item/ItemCreate";
import ItemEdit from "./resources/item/ItemEdit";
import { OrderList } from "./resources/Order/OrderList";
import MemberShow from "./resources/member/MemberShow";
import OrderShow from "./resources/Order/OrderShow";
import ProductShow from "./resources/product/ProductShow";
import ItemShow from "./resources/item/ItemShow";
import MemberEdit from "./resources/member/MemberEdit";
import OrderEdit from "./resources/Order/OrderEdit";
import ProductTypeShow from "./resources/productType/ProductTypeShow";
import ReturnRecordList from "./resources/returnRecord/ReturnRecord";

const dataProvider = drfProvider(API_BASE + "/api", fetchJsonWithAuthToken);
const authProvider = tokenAuthProvider();

function App() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource
        options={{ label: "產品" }}
        icon={ShoppingCartIcon}
        recordRepresentation="product_name"
        name="product"
        list={ProductList}
        create={ProductCreate}
        edit={ProductEdit}
        show={ProductShow}
      />
      <Resource
        options={{ label: "產品種類" }}
        icon={CategoryIcon}
        recordRepresentation="name"
        name="productType"
        list={ProductTypeList}
        create={ProductTypeCreate}
        edit={ProductTypeEdit}
        show={ProductTypeShow}
      />
      <Resource
        options={{ label: "庫存管理" }}
        icon={InventoryIcon}
        name="item"
        list={ItemList}
        create={ItemCreate}
        edit={ItemEdit}
        show={ItemShow}
      />
      <Resource
        options={{ label: "會員列表" }}
        icon={PersonIcon}
        recordRepresentation="member_name"
        name="member"
        edit={MemberEdit}
        list={MemberList}
        show={MemberShow}
      />
      <Resource
        options={{ label: "訂單" }}
        icon={BorderColorIcon}
        name="order"
        edit={OrderEdit}
        list={OrderList}
        show={OrderShow}
      />
      <Resource
        options={{ label: "歸還紀錄" }}
        name="returnRecord"
        list={ReturnRecordList}
      />
    </Admin>
  );
}

export default App;
