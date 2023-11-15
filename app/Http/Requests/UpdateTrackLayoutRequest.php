<?php

namespace App\Http\Requests;

use Illuminate\Database\Query\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateTrackLayoutRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->can('track.layouts.update');
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
                Rule::unique('track_layouts', 'name')
                    ->where(function (Builder $query) {
                        $query->where('track_id', $this->route('track'));
                    }),
            ],
            'is_default' => 'required|boolean',
            'length' => 'nullable|numeric',
        ];
    }

    public function messages()
    {
        return [
            'name.unique' => 'The layout name provided is already in use on this track.',
        ];
    }
}
