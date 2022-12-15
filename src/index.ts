import "./sass/style.scss";
import { TopHeader, BottomHeader } from "./components/header";

const headerTop = new TopHeader();
headerTop.drawElements();
const headerBottom = new BottomHeader();
headerBottom.drawElements();
