<template>
  <div class="info">
    <section class="format">
      <h2>About</h2> 
      <p>
        This application formats and stores serial number data which can then be
        sorted, filtered, grouped, and downloaded or uploaded as CSV files.
      </p>
    </section> 
    <section class="format">
      <h2>Data Persistence</h2> 
      <p>
        The application stores its data in the browser's IndexedDB, which is
        persistent across browser sessions.  Use the same browser to access the
        same data.
      </p>
      <p>
        If there is ever a need to clear the browser cache -which 
        deletes the browser's DB- download a csv first. To restore the data,
        upload the csv.
      </p>
      <p>
        CSV downloads (see below) can be used to preserve snapshots
        of the database across history.
      </p>
    </section> 
    <section class="format">
      <h2>Entering Data</h2> 
      <p>
        Input fields must all contain values before "Save" or enter / return 
        will add it to the list.
      </p>
      <p> Entering CHI 5 R 110 001 A will get formatted to CHI-5R-V110-001_REVA
      </p>
    </section> 
    <section>
      <h2>Sequence Number</h2> 
      <p>
        The second to last input field holds the sequence number which gets 
        auto-incremented by one if an identical serial number already exists.
      </p>
    </section> 
    <section class="format">
      <h2>Add 10</h2> 
      <p>
        Auto-generate 10 random entries at a time for testing the application.
        Use Delete All to delete the database and start again with no entries.
      </p>
    </section> 
    <section>
      <h2>Filter</h2> 
      <p>
        To filter entries by one or more fields, enter the values to filter for
        in the input fields and press "Filter".  
      </p> 
      <p>
        Press "Clear" to return to the complete list of entries.
      </p> 
    </section> 
    <section>
      <h2>Group By and Reverse</h2> 
      <p>
        P=Program, S=Size, H=Hand, V=Version, R=Revision, Name, Date buttons:
      </p> 
      <p>
        Pressing any of these will sort the list of entries into groups by that value.
        Press another to group by a different value.
        Press again to go back to default sorting by sequence nr.
      </p> 
      <p>
        "Reverse" any list, whether grouped, filtered, or complete. Reverse again to
        return to the default order.
      </p>
    </section> 
    <section>
      <h2>Download & Upload CSV</h2> 
      <p>
        Press "Download CSV". The currently shown list will become 'serials.csv' in
        the downloads folder formatted as shown below.  If the list is filtered, grouped or
        reversed, that is the csv that will be generated. To get the complete, ungrouped, 
        unfiltered list, use "Clear" to un-filter or un-highlight the highlighted GroupBy button.
      </p> 
      <p>
        Press "Upload CSV".  Select the csv file to be uploaded. It will completely replace
        all entries in the application's database. Therefore this operation should be
        done with caution.
      </p> 
      <p>
        • Keep downloaded csv files and give them good names to preserve any
        desired state of the data and readily identify them.
      </p> 
      <p>
        • CSVs to be uploaded should have the same format as downloaded ones. If
        a csv hasn't been altered since being downloaded, it will already
        be formatted properly.
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
