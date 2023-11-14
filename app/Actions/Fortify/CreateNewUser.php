<?php

namespace App\Actions\Fortify;

use App\Models\Invitation;
use App\Models\User;
use Illuminate\Support\Env;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Laravel\Jetstream\Jetstream;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'alias' => [
                'required',
                Rule::unique('users', 'alias'),
                'alpha_dash:ascii',
            ],
            'dob' => ['required', 'date', 'before:-13 years'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => $this->passwordRules(),
            'terms' => Jetstream::hasTermsAndPrivacyPolicyFeature() ? ['accepted', 'required'] : '',
        ], [
            'dob.before' => 'You must be over 13 years of age to use this service.'
        ])->validate();

        if (Env::get('APP_INVITATION_ONLY', false)) {
            $invitation = Invitation::where('email', $input['email'])->first();
            $invitation->registered_at = now();
            $invitation->save();
        }

        return User::create([
            'name' => $input['name'],
            'alias' => $input['alias'],
            'dob' => $input['dob'],
            'email' => $input['email'],
            'password' => Hash::make($input['password']),
        ]);
    }
}
