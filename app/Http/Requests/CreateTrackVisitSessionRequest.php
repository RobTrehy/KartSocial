<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateTrackVisitSessionRequest extends FormRequest
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
            'track_visit_id' => 'required|exists:App\Models\TrackVisit,id',
            'session_name' => 'required|string',
            'session_type' => 'required|in:Practice,Qualifying,Heat,Semi Final,Grand Final,Final,Race',
            'session_length_type' => 'required|in:Laps,Minutes',
            'session_length' => 'required|numeric',
            'session_order' => 'required|numeric',
            'total_drivers' => 'nullable|numeric',
            'finish_position' => 'nullable|numeric',
        ];
    }
}
