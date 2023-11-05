<?php
/**
 * It is the controller which controls the sub-directory for
 * the Access portal.
 */
class Access extends Router
{
    public function __construct() {
        $name = get_class($this);
        $portal_address = "/{$name}";
        $this->setRoute(str_replace($portal_address, "", $_SERVER['REQUEST_URI']));
        $this->setRoot($_SERVER['DOCUMENT_ROOT']);
        $this->setRequestMethod($_SERVER['REQUEST_METHOD']);
        $this->initialize();
    }
    
    /**
     * Initializing the controller which will map all the address
     * according its routing.
     * @return void
     */
    public function initialize(): void
    {
        $this->setCurrentTime(time());
        $this->setExpiryTime($this->getCurrentTime() + 3600);
        if ($this->getRoute() == "" || $this->getRoute() == "/") {
            $this->index();
            exit;
        } else {
            $function_name = strtolower(str_replace("/", "", $this->getRoute()));
            $this->verifyRoute($function_name);
            exit;
        }
    }

    /**
     * Verifying that the route is implemented to serve the data
     * needed.
     * @param string $function_name The name of the function which is the name of the route.
     * @return void
     */
    public function verifyRoute(string $function_name): void
    {
        if (method_exists($this, $function_name)) {
            $this->{$function_name}();
        } else {
            require_once "{$this->getRoot()}/Views/HTTP501.php";
            $this->setStatusCode(501);
            header("Content-Type: text/html; charset=UTF-8", true, $this->getStatusCode());
            header("Date: {$current_time}", true, $this->getStatusCode());
            header("Expires: {$expiry_time}", true, $this->getStatusCode());
            header("Cache-Control: private; max-age=3600", true, $this->getStatusCode());
            header("Server: Mind Blower", true, $this->getStatusCode());
            header_remove("Pragma");
            exit;
        }
    }

    /**
     * Taking the action needed for the index route of the portal.
     * @return void
     */
    public function index(): void
    {
        $this->{$this->getRequestMethod()}("/Views/Access/Homepage.php");
    }
}
