<?php

namespace App\Events;

use App\Models\TrackVisit;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TrackVisitEvent
{
    use Dispatchable, SerializesModels;

    /**
     * The Track Visit.
     */
    public $visit;

    /**
     * TrackVisit Method
     */
    public $method;

    /**
     * Create a new event instance.
     */
    public function __construct(TrackVisit $visit, string $method)
    {
        $this->visit = $visit;
        $this->method = $method;
    }
}
