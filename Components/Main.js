/**
 * The Main component of the application.
 */
class Main extends React.Component {
    /**
     * Initializing the component which will import set the data
     * needed to operate
     * @returns {Main}
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
     * @returns {HTMLMainElement}
     */
    render() {
        if (this.state.System.status == 404) {
            return <NotFound />;
        }
    }
}

/**
 * The component to be rendered when content is not found
 */
class NotFound extends Main {
    /**
     * Renders the components that are being returned
     * @returns {HTMLMainElement}
     */
    render() {
        return <>The content does not exist!</>;
    }
}

ReactDOM.render(<Main />, document.querySelector("main"));