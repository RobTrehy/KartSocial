<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'alias' => [
                'required',
                Rule::unique('users', 'alias')->ignore($this->route()->user->id),
                'alpha_dash:ascii',
            ],
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
