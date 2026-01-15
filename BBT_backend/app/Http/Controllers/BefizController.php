<?php

namespace App\Http\Controllers;

use App\Models\Befiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BefizController extends Controller
{
        /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ugyfel_azon' => 'required|integer|min:1014',
            'datum' => 'datetime',
            'osszeg' => 'required|integer|min:0'
        ], [
            'ugyfel_azon' => [
                'required' => 'Az ügyfél azonosítójának kitöltése kötelező',
                'integer' => 'Az ügyfél azonosítója csak szám lehet',
                'min' => 'Az ügyfél azonosítója nem lehet 1014-nél kisebb'
            ],
            'osszeg' => [
                'required' => 'Az összeg kitöltése kötelező',
                'integer' => 'Az összeg csak szám lehet',
                'min' => 'Az összeg nem lehet negatív érték'
            ]
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Az adatok nem lómegfelelőek',
                'errors' => $validator->errors()->toArray()
            ], 422);
        }

        $newRecord = new Befiz();
        $newRecord->ugyfel_azon = $request->ugyfel_azon;
        $newRecord->datum = $request->datum;
        $newRecord->osszeg = $request->osszeg;

        $newRecord->save();

        return response()->json(['success' => true, 'message' => 'Sikeres mentés'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(befiz $befiz)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(befiz $befiz)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, befiz $befiz)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $befizetes = Befiz::find($id);

        if (!empty($befizetes)) {
            $befizetes->delete();
            return response() -> json(["message" => "Befizetés törölve"], 202);
        }
        else {
            return response() -> json(["message" => "Befizetés nem található"], 404);
        }
    }
}
