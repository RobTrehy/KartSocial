<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateTrackRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->can('tracks.update');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                Rule::unique('tracks', 'name')->ignore($this->route('track')),
            ],
            'address_1' => 'nullable|string',
            'address_2' => 'nullable|string',
            'address_3' => 'nullable|string',
            'town' => 'nullable|string',
            'county' => 'nullable|string',
            'postal_code' => 'nullable|string',
            'type' => 'required|in:Indoor,Outdoor',
            'url' => 'nullable|url:http,https',
            'number' => 'nullable|string',
        ];
    }
}
