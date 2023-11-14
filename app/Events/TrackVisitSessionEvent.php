<?php

namespace App\Events;

use App\Models\TrackVisitSession;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TrackVisitSessionEvent
{
    use Dispatchable, SerializesModels;

    /**
     * The Track Session.
     */
    public $session;

    /**
     * TrackSession Method
     */
    public $method;

    /**
     * Create a new event instance.
     */
    public function __construct(TrackVisitSession|array $session, string $method)
    {
        $this->session = $session;
        $this->method = $method;
    }
}
