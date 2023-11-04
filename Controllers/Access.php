<?php
/**
 * It is the controller which controls the sub-directory for
 * the Access portal.
 */
class Access
{
    /**
     * The request uniform resource information of the hypertext
     * transfer protocol.
     * @var string $request_uri
     */
    private string $request_uri;
    /**
     * The server on which the application is being hosted
     * @var string $root
     */
    private string $root;
    /**
     * The request method of the HTTP request.
     * @var string $request_method
     */
    private string $request_method;

    public function __construct() {
        $name = get_class($this);
        $portal_address = "/{$name}";
        $this->setRequestUri(str_replace($portal_address, "", $_SERVER["REQUEST_URI"]));
        $this->setRoot($_SERVER['DOCUMENT_ROOT']);
        $this->setRequestMethod($_SERVER['REQUEST_METHOD']);
        $this->initialize();
    }

    public function getRequestUri(): string
    {
        return $this->request_uri;
    }

    public function setRequestUri(string $request_uri): void
    {
        $this->request_uri = $request_uri;
    }

    public function getRoot(): string
    {
        return $this->root;
    }

    public function setRoot(string $root): void
    {
        $this->root = $root;
    }

    public function getRequestMethod(): string
    {
        return $this->request_method;
    }

    public function setRequestMethod(string $request_method): void
    {
        $this->request_method = $request_method;
    }

    /**
     * Initializing the controller which will map all the address
     * according its routing.
     * @return void
     */
    public function initialize(): void
    {
        if ($this->getRequestUri() == "" || $this->getRequestUri() == "/") {
            $this->index();
            exit;
        } else {
            $this->{$this->getRequestUri()}();
            exit;
        }
    }

    /**
     * Taking the action needed
     * @return void
     */
    public function index():void
    {
        require_once "{$this->getRoot()}/Views/Access/Homepage.php";
    }
}
