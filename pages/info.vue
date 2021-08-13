<template>
  <div class="info">
    <section class="format">
      <h2>Data Persistence</h2> 
      <p>
        The application stores its data in the browser's IndexedDB, which is
        persistent across browser sessions.  Use the same browser to access the
        same data.
      </p>
      <p>
        If there is ever a need to clear the browser cache, which 
        deletes the browser's DB, download a csv first. Restoring data is as fast and
        easy as uploading the csv.
      </p>
      <p>
        CSV downloads (see below) can be used to preserve snapshots
        of the database across history.
      </p>
    </section> 
    <section class="format">
      <h2>Inputs</h2> 
      <p>
        Input fields must all contain values before "Save" or enter / return 
        will add it to the list.
      </p>
      <p> Entering
        <span class="underline">CHI 5 R 110 001 A</span> 
        will get formatted to
        <span class="underline">CHI-5R-V110-001_REVA</span>
      </p>
    </section> 
    <section class="format">
      <h2>Add 10 / Add 100</h2> 
      <p>
        Randomly auto-generate 10 or 100 entries at a time for practice or testing.
        Use Delete All to start fresh with no entries.
      </p>
    </section> 
    <section>
      <h2>Q</h2> 
      <p>
        The second to last input field holds the sequence number, Q, which gets 
        auto-incremented. This input field is disabled by default.
      </p>
      <p>
        However, it can be reset via "Edit Q".  A new sequence number
        must be at least one more than the largest so that
        auto-incrementing works properly for new entries.
      </p>
    </section> 
    <section>
      <h2>Edit an Entry</h2> 
      <p>
        Select an entry to be edited by clicking on it.  Its values will appear
        in the input fields.
      </p> 
      <p>
        Edit values and press "Save" (or enter / return).
      </p> 
    </section> 
    <section>
      <h2>Filter</h2> 
      <p>
        To filter entries by one or more fields, enter the values to filter for
        in the input fields and press "Filter".  Entering "5" in the Size field and pressing
        Filter will return only entries with Size 5.  Entering CHI in Program and L in Hand 
        will likewise return only entries that have both values.
      </p> 
      <p>
        Press "Clear" to return to the complete list of entries.
      </p> 
    </section> 
    <section>
      <h2>Group By</h2> 
      <p>
        P=Program, S=Size, H=Hand, V=Version, Q=SequenceNr, R=Revision, Name, Date
      </p> 
      <p>
        Pressing any of these will sort the list of entries into groups by that value.
        Press another to group by a different value.
        Press again to go back to default sorting by sequence nr.
      </p> 
      <p>
        "Reverse" any list, whether grouped, filtered, or complete.
      </p>
    </section> 
    <section>
      <h2>Reassign Q for an Entry</h2> 
      <p>
        Select an entry and press "Reassign Q". Edit the value, "Save" or enter / return.
      </p> 
      <p>
        When reassigning the sequence nr, the new value must be less than the 
        highest value already assigned in all entries. It also must not already be taken.
        Trying to assign a Q that doesn't meet these criteria will make no change.
      </p> 
    </section> 
    <section>
      <h2>Download & Upload CSV</h2> 
      <p>
        Press "Download CSV". The currently shown list will become a csv file in the
        downloads folder. If the list has been filtered, grouped or
        reversed, that is the csv that will be generated.
      </p> 
      <p>
        Press "Upload CSV".  Select the csv file to be uploaded. It will completely replace
        all entries in the application's database. Therefore this operation should be
        done with caution.
      </p> 
      <p>
        • Keep downloaded csv files and name them to easily restore data to any previous
        state.
      </p> 
      <p>
        • CSVs to upload should have the same format as downloaded ones:
      </p> 
     <article>
      <h3>Program,Size,Hand, Version,Sequence,Revision, Name,Date</h3> 
      <h3>GDO,6,R,120,010,C,Sue,08-12-2021</h3> 
      <h3>ART,4,L,130,008,A,Joe,08-12-2021</h3> 
      <h3>CHI,5,R,112,007,AB,Elmer,08-12-2021</h3> 
     </article> 
      
    </section> 
  </div> 
</template>

<script>
export default {
};
</script>

<style scoped>
.info {
  color: #f1f1d2;
  padding-top: 3rem;
  padding-right: 3rem;
  padding-left: 20vw;
  padding-right: 15vw;
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
  background: #09192b;
  min-height: 100vh;
  line-height: 1.6;
  letter-spacing: 1.5px;
}

section {
  margin-block: 1rem; 
}

h2 {
  word-spacing: 5px;
  letter-spacing: 3px;
  font-size: 1.3rem;
}

h2, h3, h4 {
  color: orange;
  margin-bottom: 0.5rem;
  margin-right: 1rem;
  display: inline-block;
}

article {
  padding-top: 2rem;
}

article h3 {
  display: block;
  padding-left: 4rem;
}

h4 {
  color: yellow; 
  margin-right: 2rem;
}

p {
  font-size: 1.4rem;
  text-indent: 2rem;
}
.underline {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .info {
    max-width: 100vw;
    min-height: 100vh;
    font-size: 1rem;
    padding: 3rem 1rem 5rem 1rem;
    display: flex;
    flex-direction: column;
    background: #09192b;
    line-height: 1.2;
    letter-spacing: 1.2px;
  }
  p {
    font-size: 1.1rem;
  }
  article {
    max-width: 100vw;
    display: flex;
    flex-wrap: wrap;
  }
  article h3 {
    padding-left: 0;
  }
}
</style>
