<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateTrackVisitRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->can('visits.create');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'visit_date' => 'required',
            'track_layout_id' => 'required|exists:App\Models\TrackLayout,id',
            'title' => 'required|string',
            'notes' => 'nullable|string',
            // 'linked_visit_id' => 'nullable|exists:App\Models\TrackVisit,id',
        ];
    }
}
