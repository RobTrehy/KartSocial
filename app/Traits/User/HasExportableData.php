<?php

namespace App\Traits\User;

use App\Models\Track;
use App\Models\TrackVisit;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Spatie\PersonalDataExport\PersonalDataSelection;

trait HasExportableData
{
    /**
     * Prepare Personal Data for export
     */
    public function selectPersonalData(PersonalDataSelection $personalDataSelection): void
    {
        $personalDataSelection
            ->add('user.json', [
                'name' => $this->name,
                'alias' => $this->alias,
                'date_of_birth' => $this->dob,
                'email' => $this->email,
                'weight' => $this->weight,
                'homeTrack' => ($this->home_track_id) ? Track::find($this->home_track_id)->track_name : '',
            ])
            ->add('tracks.json', $this->buildTrackData());

        if ($this->profile_photo_path) {
            $personalDataSelection->addFile(Storage::path($this->profile_photo_path));
        }
        if ($this->cover_photo_path) {
            $personalDataSelection->addFile(Storage::path($this->cover_photo_path));
        }
    }

    /**
     * Name the Personal Data export file
     */
    public function personalDataExportName(): string
    {
        return "personal-data-{$this->alias}.zip";
    }

    /**
     * Build the Users Track data for export
     */
    private function buildTrackData(): array
    {
        $visits = TrackVisit::where('user_id', Auth::id())->get();
        $data = [];
        foreach ($visits as $i => $visit) {
            $data[$visit->trackLayout->track->name][$visit->trackLayout->name]['visits'][$i] = [
                'date' => Carbon::parse($visit->visit_date)->toJSON(),
                'title' => $visit->title,
                'notes' => $visit->notes,
                'created_at' => Carbon::parse($visit->created_at)->toJSON(),
                'updated_at' => Carbon::parse($visit->updated_at)->toJSON(),
                'sessions' => [],
            ];
            foreach ($visit->sessions as $si => $session) {
                $data[$visit->trackLayout->track->name][$visit->trackLayout->name]['visits'][$i]['sessions'][$si] = [
                    'name' => $session->session_name,
                    'type' => $session->session_type,
                    'length' => $session->session_length.' '.$session->session_length_type,
                    'position' => $session->finish_position,
                    'drivers' => $session->total_drivers,
                    'created_at' => Carbon::parse($visit->created_at)->toJSON(),
                    'updated_at' => Carbon::parse($visit->updated_at)->toJSON(),
                    'laps' => [],
                ];
                foreach ($session->laps as $li => $lap) {
                    $data[$visit->trackLayout->track->name][$visit->trackLayout->name]['visits'][$i]['sessions'][$si]['laps'][$li] = [
                        'lap_number' => $lap->lap_number,
                        'lap_time' => Carbon::now()->setTimestamp($lap->lap_time)->format('i:s.v'),
                        'lap_diff' => $lap->lap_diff,
                    ];
                }
            }
        }

        return $data;
    }
}
