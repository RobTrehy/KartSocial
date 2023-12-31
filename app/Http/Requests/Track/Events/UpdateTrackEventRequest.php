<?php

namespace App\Http\Requests\Track\Events;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateTrackEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->can('visits.update');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'track_layout_id' => 'required|exists:App\Models\TrackLayout,id',
            'date' => 'required',
            'name' => 'required|string',
            'description' => 'nullable|string',
        ];
    }
}
