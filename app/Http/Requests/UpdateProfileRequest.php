<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->can('user-profile.update');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'alias' => [
                'required',
                Rule::unique('users', 'alias')->ignore(Auth::id()),
                'alpha_dash:ascii',
            ],
            'bio' => 'nullable|string|max:120',
            'weight' => 'nullable|decimal:1',
            'home_track_id' => 'nullable|exists:tracks,id',
        ];
    }

    public function messages()
    {
        return [
            'alias.unique' => 'The display name has already been taken.',
            'alias.alpha_dash' => 'The display name field must only contain letters, numbers, dashes, and underscores.',
        ];
    }
}
