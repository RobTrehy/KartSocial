<?php

namespace App\Http\Requests\Track\Sessions;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateTrackSessionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->can('visits.sessions.create');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'track_event_id' => 'required|exists:App\Models\TrackEvent,id',
            'name' => 'required|string',
            'session_type' => 'required|in:Practice,Qualifying,Heat,Semi Final,Grand Final,Final,Race',
            'length_type' => 'required|in:Laps,Minutes',
            'length' => 'required|numeric',
            'order' => 'required|numeric',
            'total_drivers' => 'nullable|numeric',
        ];
    }
}
