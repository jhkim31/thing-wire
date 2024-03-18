const MAIN_THEME_COLOR="#334F6C";
const MAIN_THEME_FONT_COLOR="#eee";
const CONTENT_BACKGROUND="#F8F9FD";
const CONTENT_ITEM_BORDER_COLOR="#DEE1EF";
const LIST_ITEM_HOVER_COLOR = "#E5F3FC";

const config = {
    style: {
        "main-theme-color": MAIN_THEME_COLOR,
        "main-theme-font-color": MAIN_THEME_FONT_COLOR,
        "content-background": CONTENT_BACKGROUND,
        "content-item-border-color": CONTENT_ITEM_BORDER_COLOR,
        "list-item-hover-color": LIST_ITEM_HOVER_COLOR,

        Sidebar: {
            paddingLeft: "10px",
            fontSize: "0.8em",
        },
        Dashboard : {
            fontSize: "1.7em",
            color: MAIN_THEME_COLOR,
        },
        DashboardButton: {
            width: "100px",
            height: "40px",
            borderRadius: "20px",
            fontSize: "1.2em",
            userSelect: "none",
            display: "inline-block",
            fontFamily: `"paybooc-Light", sans-serif`,
            textDecoration: "none",
            position: "relative",
            fontWeight: "400",
            transition: "0.25s",
            backgroundColor: "#fff",
            color: "#4EABE9",
            marginRight: "5px",
            marginBottom: "3px",
            hover: {
                backgroundColor: "#4EABE9",
                color: "white",
            },
        },
    },
};

export default config;
