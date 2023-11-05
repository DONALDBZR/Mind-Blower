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
            $this->{$function_name}();
            exit;
        }
    }

    /**
     * Taking the action needed
     * @return void
     */
    public function index(): void
    {
        $this->get("/Views/Access/Homepage.php");
    }
}
