/**
 * The Header component of the application.
 */
class Header extends React.Component {
    /**
     * Initializing the component which will import set the data
     * needed to operate
     * @returns {Header}
     */
    constructor(props) {
        super(props);
        /**
         * The states of the application
         * @type {{ System: { route: string, color_scheme: string, status: number } }}
         */
        this.state = {
            System: {
                route: "",
                color_scheme: "",
                status: 200,
            },
        };
    }
    
    /**
     * Running the methods needed as soon as the component has been
     * successfully mounted.
     * @returns {void}
     */
    componentDidMount() {
        this.getRoute();
        this.getStatus();
    }

    /**
     * Setting the view route of the application.
     * @returns {void}
     */
    getRoute() {
        this.setState((previous) => ({
            System: {
                ...previous.System,
                route: window.location.pathname,
            },
        }));
    }
    
    /**
     * Retrieve the Status of the page.
     * @returns {void}
     */
    getStatus() {
        this.setState((previous) => ({
            System: {
                ...previous.System,
                status: Number(document.body.attributes["status"].value)
            }
        }));
    }
    
    /**
     * Renders the components that are being returned
     * @returns {HTMLHeaderElement}
     */
    render() {
        if (this.state.System.status == 404) {
            return <NotFound />;
        }
    }
}

ReactDOM.render(<Header />, document.querySelector("header"));