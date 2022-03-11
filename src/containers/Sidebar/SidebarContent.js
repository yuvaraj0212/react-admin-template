import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";

import Auxiliary from "util/Auxiliary";
import UserProfile from "./UserProfile";
// import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

class SidebarContent extends Component {

  getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  render() {
    const { themeType, navStyle, pathname } = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];
    return (<Auxiliary>

      <SidebarLogo />
      <div className="gx-sidebar-content">
        <div className={`gx-sidebar-notifications ${this.getNoHeaderClass(navStyle)}`}>
          <UserProfile />
          {/* <AppsNavigation /> */}
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            mode="inline">

            <Menu.Item key="dashboard">
              <Link to="/dashboard"><i className="icon icon-widgets" />
                <IntlMessages id="sidebar.dashboard" /></Link>
            </Menu.Item>
            <Menu.Item key="custom-views/eCommerce/product-list">
              <Link to="/product-list">
                <i className="icon icon-shopping-cart" />
                <IntlMessages
                  id="sidebar.eCommerce.productList" /></Link>
            </Menu.Item>
            <Menu.Item key="orders">
              <Link to="/orders">
                <i className="icon icon-orders" />
                <IntlMessages
                  id="Orders" /></Link>
            </Menu.Item>
            <Menu.Item key="categories">
              <Link to="/categories">
                <i className="icon icon-icon" />
                <IntlMessages
                  id="Category" /></Link>
            </Menu.Item>
            <Menu.Item key="customer">
              <Link to="/customer">
                <i className="icon icon-profile2" />
                <IntlMessages
                  id="Customers" /></Link>
            </Menu.Item>
            <Menu.Item key="setting">
              <Link to="/setting">
                <i className="icon icon-setting" />
                <IntlMessages
                  id="Setting" /></Link>
            </Menu.Item>
            {/* <MenuItemGroup key="main" className="gx-menu-group" title={<IntlMessages id="sidebar.main" />}>
              <SubMenu key="dashboard" className={this.getNavStyleSubMenuClass(navStyle)}
                title={<span> <i className="icon icon-dasbhoard" />
                  <IntlMessages id="sidebar.dashboard" /></span>}>
                <Menu.Item key="main/dashboard/crypto">
                  <Link to="/main/dashboard/crypto">
                    <i className="icon icon-crypto" />
                    <IntlMessages id="sidebar.dashboard.crypto" />
                  </Link>
                </Menu.Item>
                <Menu.Item key="main/dashboard/crm">
                  <Link to="/main/dashboard/crm">
                    <i className="icon icon-crm" />
                    <IntlMessages id="sidebar.dashboard.crm" />
                  </Link>
                </Menu.Item>
                <Menu.Item key="main/dashboard/listing">
                  <Link to="/main/dashboard/listing">
                    <i className="icon icon-listing-dbrd" />
                    <IntlMessages id="sidebar.dashboard.listing" />
                  </Link>
                </Menu.Item>
              </SubMenu>

              <Menu.Item key="main/widgets">
                <Link to="/main/widgets"><i className="icon icon-widgets" />
                  <IntlMessages id="sidebar.widgets" /></Link>
              </Menu.Item>

              <Menu.Item key="main/metrics">
                <Link to="/main/metrics"><i className="icon icon-apps" />
                  <IntlMessages id="sidebar.metrics" /></Link>
              </Menu.Item>

              <Menu.Item key="main/layouts">
                <Link to="/main/layouts"><i className="icon icon-card" />
                  <IntlMessages id="sidebar.layouts" /></Link>
              </Menu.Item>

            </MenuItemGroup> */}

          </Menu>
        </CustomScrollbars>
      </div>
    </Auxiliary>
    );
  }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({ settings }) => {
  const { navStyle, themeType, locale, pathname } = settings;
  return { navStyle, themeType, locale, pathname }
};
export default connect(mapStateToProps)(SidebarContent);

